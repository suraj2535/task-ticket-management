# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies for both frontend and backend
RUN npm install

# Copy project files
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Switch to backend directory
WORKDIR /app/backend

# Expose port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]