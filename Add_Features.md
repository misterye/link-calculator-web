增加以下几个模块，将会极大地提升该工具在专业人群中的实用价值和不可替代性：

### 1. 核心痛点：$E_b/N_0$ 与 $C/N$ (SNR) 的转换

**痛点分析：** 调制解调器（Modem）的厂家给出的门限指标通常是 $E_b/N_0$（每比特能量与噪声功率谱密度之比），而射频工程师在做链路预算时，计算出来的往往是 $C/N$（载噪比）或 $SNR$（信噪比）。这两者之间的互相转换是初中级工程师最容易出错的地方。

**转换公式：**


$$[C/N]_{dB} = [E_b/N_0]_{dB} + 10 \times \log_{10}\left(\frac{R_b}{B_n}\right)$$

* $[C/N]_{dB}$: 载噪比 (Carrier-to-Noise Ratio, dB)
* $[E_b/N_0]_{dB}$: 每比特能量与噪声谱密度比 (dB)
* $R_b$: 信息速率 (Information Bit Rate, bps)
* $B_n$: 接收机噪声等效带宽 (Noise Bandwidth, Hz)

---

### 2. 硬件痛点：噪声系数 (NF) 与等效噪声温度 ($T_e$) 的转换

**痛点分析：** 卫星通信中，低噪声放大器（LNA/LNB）的灵敏度通常用**噪声温度 (K)** 表示，而传统的射频微波器件（如放大器、混频器）则习惯用**噪声系数 (dB)** 表示。系统级联计算时必须统一单位。

**换算公式：**
**噪声系数 (dB) 转 噪声温度 (K):**


$$T_e = T_0 \times \left(10^{\frac{NF}{10}} - 1\right)$$

**噪声温度 (K) 转 噪声系数 (dB):**


$$NF = 10 \times \log_{10}\left(1 + \frac{T_e}{T_0}\right)$$

* $T_e$: 等效噪声温度 (Effective Noise Temperature, K)
* $NF$: 噪声系数 (Noise Figure, dB)
* $T_0$: 参考室温，物理标准通常取 290 K

---

### 3. 射频痛点：抛物面天线增益与半功率波束宽度 (Antenna Gain & 3dB Beamwidth)

**痛点分析：** 工程师在规划阶段，经常需要根据天线口径快速估算其增益，或者计算 3dB 波束宽度来评估天线对星的难度（波束越窄，对准越困难，受风载影响引起的抖动衰减越大）。

**天线增益 (Antenna Gain):**


$$G_{dBi} = 10 \times \log_{10}\left(\eta \times \left(\frac{\pi \times D}{\lambda}\right)^2\right)$$

* $D$: 天线直径 (m)
* $\lambda$: 信号波长 (m) ，可由光速 $c$ 除以频率 $f$ 获得
* $\eta$: 天线口径效率 (Efficiency，通常输入默认值为 0.60 至 0.65)

**半功率波束宽度 (3dB Beamwidth, $\theta_{3dB}$):**


$$\theta_{3dB} \approx \frac{70 \times \lambda}{D}$$

* $\theta_{3dB}$: 角度 (度，°)

---

### 4. 系统痛点：品质因数 ($G/T$) 与 EIRP

**痛点分析：** 这两个是卫星链路预算的灵魂指标。EIRP 衡量发射能力，$G/T$ 衡量接收能力。

**有效全向辐射功率 (EIRP):**


$$EIRP_{dBW} = P_{tx} + G_{tx} - L_{tx}$$

* $P_{tx}$: 功放输出功率 (dBW)
* $G_{tx}$: 发射天线增益 (dBi)
* $L_{tx}$: 发射端馈线损耗 (dB)

**接收系统品质因数 (G/T):**


$$G/T = G_{rx} - 10 \times \log_{10}(T_{sys})$$

* $G_{rx}$: 接收天线增益 (dBi)
* $T_{sys}$: 接收系统等效总噪声温度 (K)，通常包含天线噪声温度和 LNA 噪声温度。

---
