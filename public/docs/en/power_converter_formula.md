### 1. Terminology Explanation
- **Watts (W)**: **Watt**, the absolute power unit in the SI system. 1 W = 1 Joule/second. It is the most basic linear power representation.
- **dBm** (decibel-milliwatt): **Decibel-milliwatt**. A logarithmic power unit referenced to **1 mW (milliwatt)**.
  Formula meaning: How many "10 times" a power value is compared to the reference.
  E.g.: 0 dBm = 1 mW, 10 dBm = 10 mW, 20 dBm = 100 mW, 30 dBm = 1 W.
- **dBW** (decibel-watt): **Decibel-watt**. A logarithmic unit referenced to **1 W**.
  0 dBW = 1 W, 10 dBW = 10 W, 20 dBW = 100 W.

**Why use dBm / dBW?**
In RF, antennas, 5G/Wi-Fi, and fiber optics, the power range is huge. Logarithmic units (dB) turn "multiplication" into "addition", greatly simplifying link budget calculations (Tx Power + Antenna Gain - Path Loss = Rx Power).

### 2. Core Conversion Formulas
All conversions are based on the **decibel definition**:
$$ \text{dB} = 10 \times \log_{10}\left(\frac{\text{Power}}{\text{Reference Power}}\right) $$

#### Forward Conversion (W → dBm / dBW)
- **dBW** = $10 \times \log_{10}(P_W / 1\text{ W}) = \mathbf{10 \times \log_{10}(P_W)}$
- **dBm** = $10 \times \log_{10}(P_W / 0.001\text{ W}) = 10 \times \log_{10}(P_W) + 10 \times \log_{10}(1000)$
  Since $\log_{10}(1000) = 3$, **$\mathbf{dBm = dBW + 30}$**

#### Reverse Conversion
- **P_W** (from dBW) = **$10^{(\text{dBW} / 10)}$**
- **P_W** (from dBm) = **$10^{((\text{dBm} - 30) / 10)}$**
- **dBW** = **$\text{dBm} - 30$**
- **dBm** = **$\text{dBW} + 30$**

### 3. Explanation of Principles
1. **Logarithmic Scale**: RF signal attenuation is exponential (path loss ∝ distance²), so using dB naturally fits.
2. **Reference Point**:
   - 1 mW (dBm) is typical for phones, Bluetooth, Wi-Fi.
   - 1 W (dBW) is common for base stations, amplifiers.
3. **Constant 30 dB Difference**: Because $1\text{ W} = 1000\text{ mW}$, and $10 \times \log_{10}(1000) = 30$, dBm and dBW always differ by exactly 30 dB.
