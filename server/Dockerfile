FROM node:23-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Add OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# ✨ NEW STEP — generate Prisma client
RUN npx prisma generate

ENV PORT=8000
EXPOSE 8000

CMD ["npm", "run", "dev"]