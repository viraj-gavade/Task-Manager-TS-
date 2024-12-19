# Use the Node.js LTS version as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package files to the working directory
COPY ["package.json", "package-lock.json*", "./"]

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install TypeScript globally for compilation
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

# Expose the application port
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/index.js"]
