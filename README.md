# 链路参数计算器 (Link Parameter Calculator)

一个基于 Vue 3 的卫星链路参数计算工具，用于计算卫星通信系统的链路效率和功放功率转换。

## 项目简介

本项目提供了两个核心功能模块：
1. **链路效率计算**：根据调制编码方式（MODCOD）计算数据速率、符号速率、占用带宽和链路效率
2. **功放功率换算**：在 Watts 和 dBm 两种功率单位之间进行转换

## 功能特性

### 1. 链路效率计算

支持上行和下行链路的参数计算，包括：

- **链路类型**：
  - 下行链路（Downlink）：支持 80+ 种 DVB-S2/S2X MODCOD 配置
  - 上行链路（Uplink）：支持 60+ 种 MODCOD 配置

- **计算模式**：
  - 输入数据速率（Data Rate）→ 计算符号速率、带宽和效率
  - 输入符号速率（Symbol Rate）→ 计算数据速率、带宽和效率

- **支持的调制方式**：
  - BPSK（二进制相移键控）
  - QPSK（四进制相移键控）
  - 8PSK（八进制相移键控）
  - 16APSK、32APSK、64APSK、128APSK、256APSK（振幅相移键控）

### 2. 功放功率换算

提供双向功率单位转换：
- Watts → dBm
- dBm → Watts

## 计算公式说明

### 链路效率计算公式

#### 常量定义
- **RS 编码系数** (RS_CODE): `188/204 ≈ 0.9216`
- **滚降系数** (ROLL_OFF): `0.05` (5%)
- **调制因子** (MOD_FACT):
  ```
  BPSK:    1
  QPSK:    2
  8PSK:    3
  16APSK:  4
  32APSK:  5
  64APSK:  6
  128APSK: 7
  256APSK: 8
  ```

#### 核心公式

**1. 符号速率计算**（由数据速率计算符号速率）

```
符号速率 (ksps) = 数据速率 (kbps) / (调制因子 × FEC码率 × RS编码系数)
```

**2. 数据速率计算**（由符号速率计算数据速率）

```
数据速率 (kbps) = 符号速率 (ksps) × 调制因子 × FEC码率 × RS编码系数
```

**3. 占用带宽计算**

```
带宽 (kHz) = 符号速率 (ksps) × (1 + 滚降系数)
```

**4. 链路效率计算**

```
效率 (bps/Hz) = 数据速率 (kbps) / 带宽 (kHz)
```

#### 示例

假设使用 **QPSK 3/4** 调制编码，数据速率为 1000 kbps：

1. FEC 码率 = 3/4 = 0.75
2. 调制因子 = 2 (QPSK)
3. 符号速率 = 1000 / (2 × 0.75 × 0.9216) ≈ 723.38 ksps
4. 带宽 = 723.38 × 1.05 ≈ 759.55 kHz
5. 效率 = 1000 / 759.55 ≈ 1.316 bps/Hz

### 功率换算公式

**1. Watts 转 dBm**

```
dBm = 10 × log₁₀(Watts) + 30
```

**2. dBm 转 Watts**

```
Watts = 10^((dBm / 10) - 3)
```

#### 示例

- 1 Watt = 30 dBm
- 10 Watts = 40 dBm
- 100 Watts = 50 dBm

## 技术栈

- **前端框架**：Vue 3 (Composition API with `<script setup>`)
- **路由**：Vue Router 4
- **构建工具**：Vite
- **样式**：原生 CSS

## 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问 `http://localhost:5173` 即可使用。

### 生产构建

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

## 使用方法

### 链路效率计算

1. 选择链路类型（上行/下行）
2. 选择计算方式（输入数据速率/符号速率）
3. 从下拉菜单选择合适的 MODCOD
4. 输入对应的速率值
5. 点击"计算"按钮查看结果

**计算结果包括**：
- 数据速率 (kbps)
- 符号速率 (ksps)
- 占用带宽 (kHz)
- 链路效率 (bps/Hz)

### 功放功率换算

1. 选择转换类型（Watts→dBm 或 dBm→Watts）
2. 输入功率值
3. 点击"转换"按钮查看结果

## 项目结构

```
link-calculator-web/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 公共组件
│   ├── router/          # 路由配置
│   ├── utils/           # 工具函数
│   │   └── calculator.js  # 核心计算逻辑
│   ├── views/           # 页面视图
│   │   ├── Home.vue           # 首页
│   │   ├── LinkEfficiency.vue # 链路效率计算页面
│   │   └── PowerConverter.vue # 功率换算页面
│   ├── App.vue          # 根组件
│   ├── main.js          # 入口文件
│   └── style.css        # 全局样式
├── index.html
├── package.json
└── vite.config.js
```

## MODCOD 说明

### 下行链路（DVB-S2/S2X）

支持从 `BPSK 1/5` 到 `256APSK 3/4` 共计 80+ 种配置，涵盖低码率到高码率应用场景。

### 上行链路

支持从 `QPSK-7/20` 到 `64APSK-53/60` 共计 60+ 种配置。

## 注意事项

- 所有计算结果保留 3 位小数
- 符号速率和带宽的计算考虑了 5% 的滚降系数
- FEC 码率从 MODCOD 字符串中自动解析
- 带 `-L` 后缀的 MODCOD 表示低信噪比优化配置

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过 GitHub Issues 联系。
