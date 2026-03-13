# 项目公式汇总 (Project Formulas Summary)

本项目主要涉及卫星链路参数计算和功率单位换算，核心公式位于 [calculator.js](file:///d:/projects/link-calculator-web/src/utils/calculator.js)。

## 1. 链路效率计算 (Link Efficiency Calculation)

用于计算数据速率、符号速率、带宽及链路效率。

### 核心公式
*   **符号速率 (Symbol Rate)**
    $$R_s = \frac{R_d}{M \times r \times R_{RS}}$$
    *   $R_d$: 数据速率 (Data Rate, kbps)
    *   $M$: 调制因子 (Modulation Factor)
    *   $r$: FEC 码率 (FEC Rate)
    *   $R_{RS}$: RS 编码效率 (RS Code Rate)

*   **占用带宽 (Occupied Bandwidth)**
    $$BW = R_s \times (1 + \alpha)$$
    *   $\alpha$: 滚降因子 (Roll-off factor)

*   **链路效率 (Efficiency)**
    $$\eta = \frac{R_d}{BW}$$

*   **数据速率 (Data Rate) - 当已知符号速率时**
    $$R_d = R_s \times M \times r \times R_{RS}$$

### 常数定义 (Constants)
*   **RS 编码效率 ($R_{RS}$)**: $188 / 204 \approx 0.9216$
*   **滚降因子 ($\alpha$):** $0.05$ ($5\%$)

### 调制因子 ($M$) 对应表
| 调制方式 (Modulation) | 调制因子 ($M$) |
| :--- | :--- |
| BPSK | 1 |
| QPSK | 2 |
| 8PSK | 3 |
| 16APSK | 4 |
| 32APSK | 5 |
| 64APSK | 6 |
| 128APSK | 7 |
| 256APSK | 8 |

---

## 2. 功率换算 (Power Conversion)

用于 Watts 和 dBm 之间的单位转换。

### 换算公式
*   **Watts 转 dBm**
    $$P_{dBm} = 10 \times \log_{10}(P_W) + 30$$

*   **dBm 转 Watts**
    $$P_W = 10^{\frac{P_{dBm} - 30}{10}}$$
    *(或者写为 $10^{(P_{dBm}/10 - 3)}$)*

---

## 涉及文件 (Relevant Files)
*   [calculator.js](file:///d:/projects/link-calculator-web/src/utils/calculator.js): 包含所有计算逻辑。
*   [LinkEfficiency.vue](file:///d:/projects/link-calculator-web/src/views/LinkEfficiency.vue): 链路效率计算界面。
*   [PowerConverter.vue](file:///d:/projects/link-calculator-web/src/views/PowerConverter.vue): 功率换算界面。
