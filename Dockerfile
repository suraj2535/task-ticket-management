FROM node:18

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Install and build frontend
WORKDIR /app/frontend
RUN npm install --legacy-peer-deps
RUN CI=true npm run build

# Switch to backend
WORKDIR /app/backend
RUN npm install

EXPOSE 5001

CMD ["npm", "start"]