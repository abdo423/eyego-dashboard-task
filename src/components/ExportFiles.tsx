'use client';
import React, { useState } from 'react';
import { FileDown, FileSpreadsheet, Loader2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

declare module 'jspdf' {
    interface jsPDF {
        lastAutoTable: {
            finalY: number;
        };
    }
}

interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
}

const ExportFiles = () => {
    const [isExportingPDF, setIsExportingPDF] = useState(false);
    const [isExportingExcel, setIsExportingExcel] = useState(false);
    const { totalPages } = useAppSelector((state) => state.employee);

    const fetchAllEmployees = async (): Promise<Employee[]> => {
        const allEmployees: Employee[] = [];

        try {
            const firstPageResponse = await fetch('/api/employees?page=1&limit=100');
            const firstPageData = await firstPageResponse.json();

            allEmployees.push(...firstPageData.data);
            const total = firstPageData.totalPages || totalPages;

            const pagePromises = [];
            for (let page = 2; page <= total; page++) {
                pagePromises.push(
                    fetch(`/api/employees?page=${page}&limit=100`)
                        .then(res => res.json())
                        .then(data => data.data)
                );
            }

            const remainingPages = await Promise.all(pagePromises);
            remainingPages.forEach(pageData => {
                allEmployees.push(...pageData);
            });

            return allEmployees;
        } catch (error) {
            console.error('Error fetching all employees:', error);
            throw new Error('Failed to fetch employee data');
        }
    };

    const handleExportPDF = async () => {
        setIsExportingPDF(true);

        try {
            const allEmployees = await fetchAllEmployees();

            if (allEmployees.length === 0) {
                alert('No employees to export');
                setIsExportingPDF(false);
                return;
            }

            const doc = new jsPDF();

            doc.setProperties({
                title: 'Employee Dashboard Report',
                subject: 'Employee Information',
                author: 'Employee Dashboard',
                keywords: 'employees, dashboard, report',
                creator: 'Employee Dashboard System'
            });

            doc.setFontSize(22);
            doc.setTextColor(17, 24, 39);
            doc.text('Employee Dashboard', 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            doc.text('Complete employee information report', 14, 27);

            doc.setFontSize(9);
            doc.setTextColor(75, 85, 99);
            const currentDate = new Date().toLocaleString();
            doc.text(`Generated: ${currentDate}`, 14, 34);
            doc.text(`Total Employees: ${allEmployees.length}`, 14, 39);

            doc.setDrawColor(16, 185, 129);
            doc.setLineWidth(0.5);
            doc.line(14, 42, 196, 42);

            const tableData = allEmployees.map(emp => [
                emp.id.toString(),
                emp.name,
                emp.department,
                `$${emp.salary.toLocaleString()}`
            ]);

            const departmentColors: { [key: string]: [number, number, number] } = {
                HR: [219, 234, 254],
                IT: [233, 213, 255],
                Finance: [254, 215, 170],
                Marketing: [251, 207, 232],
                Sales: [209, 250, 229],
            };

            autoTable(doc, {
                head: [['ID', 'Name', 'Department', 'Salary']],
                body: tableData,
                startY: 48,
                theme: 'striped',
                headStyles: {
                    fillColor: [16, 185, 129],
                    textColor: [255, 255, 255],
                    fontSize: 11,
                    fontStyle: 'bold',
                    halign: 'left'
                },
                bodyStyles: {
                    fontSize: 10,
                    textColor: [17, 24, 39]
                },
                alternateRowStyles: {
                    fillColor: [249, 250, 251]
                },
                columnStyles: {
                    0: { cellWidth: 20, halign: 'center' },
                    1: { cellWidth: 60 },
                    2: { cellWidth: 50 },
                    3: { cellWidth: 40, halign: 'right' }
                },
                didParseCell: function(data) {
                    if (data.column.index === 2 && data.section === 'body') {
                        const department = data.cell.raw as string;
                        if (departmentColors[department]) {
                            data.cell.styles.fillColor = departmentColors[department];
                            data.cell.styles.textColor = [31, 41, 55];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }

                    if (data.column.index === 0 && data.section === 'body') {
                        data.cell.styles.fillColor = [209, 250, 229];
                        data.cell.styles.textColor = [4, 120, 87];
                        data.cell.styles.fontStyle = 'bold';
                    }
                },
                margin: { top: 48, right: 14, bottom: 20, left: 14 },
                didDrawPage: function(data) {
                    const docInternal = doc as unknown as { internal: { getNumberOfPages: () => number } };
                    const pageCount = docInternal.internal.getNumberOfPages();
                    doc.setFontSize(8);
                    doc.setTextColor(107, 114, 128);
                    doc.text(
                        `Page ${data.pageNumber} of ${pageCount}`,
                        doc.internal.pageSize.getWidth() / 2,
                        doc.internal.pageSize.getHeight() - 10,
                        { align: 'center' }
                    );
                }
            });

            const fileName = `employees_complete_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsExportingPDF(false);
        }
    };

    const handleExportExcel = async () => {
        setIsExportingExcel(true);

        try {
            const allEmployees = await fetchAllEmployees();

            if (allEmployees.length === 0) {
                alert('No employees to export');
                setIsExportingExcel(false);
                return;
            }

            const worksheetData = [
                ['ID', 'Name', 'Department', 'Salary'],
                ...allEmployees.map(emp => [
                    emp.id,
                    emp.name,
                    emp.department,
                    emp.salary
                ])
            ];

            const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

            const columnWidths = [
                { wch: 10 },
                { wch: 30 },
                { wch: 20 },
                { wch: 15 }
            ];
            worksheet['!cols'] = columnWidths;

            const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_col(C) + '1';
                if (!worksheet[address]) continue;
                worksheet[address].s = {
                    font: { bold: true, color: { rgb: "FFFFFF" } },
                    fill: { fgColor: { rgb: "10B981" } },
                    alignment: { horizontal: "left", vertical: "center" }
                };
            }

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

            const fileName = `employees_complete_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(workbook, fileName);

        } catch (error) {
            console.error('Error generating Excel:', error);
            alert('Failed to generate Excel. Please try again.');
        } finally {
            setIsExportingExcel(false);
        }
    };

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                            Employee Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base mt-1">Manage and view all employees</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-md whitespace-nowrap bg-green-500 hover:bg-green-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isExportingExcel}
                        >
                            {isExportingExcel ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="w-4 h-4" />
                                    Export Excel
                                </>
                            )}
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 shadow-md whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isExportingPDF}
                        >
                            {isExportingPDF ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <FileDown className="w-4 h-4" />
                                    Export PDF
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportFiles;