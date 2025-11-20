
# --- Stage 1: Build ---
    FROM node:20-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json
    COPY package*.json ./
    
    # Install all dependencies (including devDependencies for TypeScript build)
    RUN npm install
    
    # Copy the entire project
    COPY . .
    
    # Build the TypeScript project
    RUN npm run build
    
    # --- Stage 2: Production ---
    FROM node:20-alpine AS production
    
    # Set working directory
    WORKDIR /app
    
    # Copy only production dependencies
    COPY --from=builder /app/package*.json ./
    RUN npm install --omit=dev
    
    # Copy the built files from the builder stage
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/public ./public
    
    # Expose the application's port (if applicable)
    EXPOSE 5000
    
    # Define the command to run the app
    CMD ["npm", "run", "start"]