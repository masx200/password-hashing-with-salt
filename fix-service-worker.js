import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文件路径
const serviceWorkerPath = path.join(__dirname, "dist", "service-worker.js");

try {
  // 读取文件内容
  let content = fs.readFileSync(serviceWorkerPath, "utf8");

  // 查找重复的 const manifestHash 声明（动态匹配任何hash值）
  const regex = /\s*const\s+manifestHash\s*=\s*"[^"]+";\s*\n(\s*\n)*\s*const\s+manifestHash\s*=\s*"[^"]+";\s*\n/g;

  // 提取第一个manifestHash的值
  const firstMatch = content.match(/const\s+manifestHash\s*=\s*"([^"]+)";/);
  const hashValue = firstMatch ? firstMatch[1] : "";

  // 替换为单个 var 声明，使用提取的hash值
  const replacement = `\n        var manifestHash = "${hashValue}";\n`;

  // 执行替换
  const newContent = content.replace(regex, replacement);

  // 检查是否有变化
  if (newContent !== content) {
    // 写入新内容
    fs.writeFileSync(serviceWorkerPath, newContent, "utf8");
    console.log(
      "✅ 成功修复 service-worker.js 中的重复 const manifestHash 声明"
    );
    console.log("   已将重复的 const 声明合并为单个 var 声明");
  } else {
    console.log("ℹ️  未发现需要修复的重复 const manifestHash 声明");
  }
} catch (error) {
  console.error("❌ 处理文件时出错:", error.message);
  process.exit(1);
}
