FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps

WORKDIR /app/backend
RUN npm install

# Copy all files
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN CI=true npm run build

EXPOSE 5001

WORKDIR /app/backend
CMD ["npm", "start"]