'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { loginSuccess, setLoading } from '@/store/features/authSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';
import SuccessStatus from '@/components/SuccesStatus';
import ErrorStatus from '@/components/ErrorStatus';
import { useAppSelector } from '@/store/hooks';
import { Loader } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginData = z.infer<typeof loginSchema>;

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Something went wrong';
};

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [generalStatus, setGeneralStatus] = useState({ success: '', error: '' });
    const { loading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGeneralStatus({ success: '', error: '' });
        setFieldErrors({});

        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFieldErrors({
                email: errors.email?.[0],
                password: errors.password?.[0],
            });
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Invalid credentials');

            const data = await res.json();
            dispatch(loginSuccess(data));
            setGeneralStatus({ success: 'Login successful!', error: '' });
            router.push('/dashboard');
        } catch (err) {
            setGeneralStatus({ success: '', error: getErrorMessage(err) });
            dispatch(setLoading(false));
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                    disabled={loading}
                                />
                                {fieldErrors.email && <ErrorStatus errorMessage={fieldErrors.email} />}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                    disabled={loading}
                                />
                                {fieldErrors.password && <ErrorStatus errorMessage={fieldErrors.password} />}
                            </Field>

                            {generalStatus.error && <ErrorStatus errorMessage={generalStatus.error} />}
                            {generalStatus.success && <SuccessStatus successMessage={generalStatus.success} />}

                            <Field>
                                <Button disabled={loading} type="submit" className="w-full">
                                    {loading ? (
                                        <>
                                            <Loader className="w-4 h-4 animate-spin mr-2" />
                                            Logging in...
                                        </>
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;