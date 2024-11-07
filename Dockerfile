



# # Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
#
# # Production stage
FROM node:18-alpine
WORKDIR /app/frontend
COPY --from=builder /app .
EXPOSE 3000
CMD ["npm","run", "start"]



