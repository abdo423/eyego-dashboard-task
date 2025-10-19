# Use the official Node.js image as base
FROM node AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production stage ----
FROM node:slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only the built output and dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
#COPY --from=builder /app ./

# Expose port and run the app
EXPOSE 3000
CMD ["npm", "start"]
