FROM node:18-alpine
WORKDIR /app

# Copy package metadata and try a clean install. If package-lock.json is missing, fall back to npm install.
COPY package.json ./
RUN npm install

# Copy source and start dev server
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
