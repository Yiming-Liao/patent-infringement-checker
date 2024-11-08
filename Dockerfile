# 使用 Node.js 官方映像檔
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 yarn.lock 或 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN yarn

# 複製專案文件
COPY . .

# 建立 Next.js 應用
RUN yarn run build

# 暴露應用的運行端口
EXPOSE 3000

# 啟動應用
CMD ["yarn", "start"]
