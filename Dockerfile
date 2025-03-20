FROM node:18

WORKDIR /app

# First copy only package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install root dependencies if any
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install --force

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Copy the rest of the application
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
ENV NODE_ENV=production
RUN npm run build

# Prepare for production
WORKDIR /app/backend
EXPOSE 5001

CMD ["npm", "start"]