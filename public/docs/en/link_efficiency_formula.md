### 1. Terminology Explanation (in order of the interface)

- **Link Type**: Downlink, refers to the transmission direction from the satellite to the ground station (opposite to Uplink). Downlinks typically use lower power and higher coding efficiency; it is a typical satellite broadcast scenario.
- **Calculation Mode**: Data Rate → Symbol Rate (from the useful data rate to the symbol rate). This is the most common mode in satellite link planning, used to calculate the required symbol rate of the transmitter when the useful bit rate (e.g., video stream 1000 kbps) is known.
- **MODCOD (Modulation and Coding Scheme)**: QPSK 3/4.
  - QPSK (Quadrature Phase Shift Keying): 4 phases, each symbol carries **m = 2** bits.
  - 3/4: **Inner code rate r** (convolutional code rate), indicating that 3 out of every 4 encoded bits are useful information bits.
- **Roll-off Factor (α)**: 0.05.
  Parameter of the pulse shaping filter (Square Root Raised Cosine filter, SRRC). α=0 means ideal rectangular spectrum (no expansion), practically it must be >0 to avoid Inter-Symbol Interference (ISI). DVB-S commonly uses 0.35, 0.25, 0.20, 0.05 (for new systems).
- **Overhead Efficiency (η_oh)**: 188/204 (DVB-S RS).
  DVB-S outer code uses Reed-Solomon (204,188) code: out of every 204 bytes, **188 bytes are effective MPEG-TS payload**, and 16 bytes are for parity. Efficiency η_oh = 188/204 ≈ 0.92157.
- **Input Data Rate**: 1000 kbps = **Useful information bit rate R_b** (the bit rate available to the end-user).
- **Outputs**:
  - Data Rate: remains 1000.0000 kbps.
  - Symbol Rate (SR): kilo-symbols per second (ksps).
  - Bandwidth: RF Bandwidth occupied.
  - Spectral Efficiency: bits/s/Hz.

### 2. Formulas and Detailed Derivation

#### Core Formula (Relation between DVB-S useful bit rate and symbol rate)

\[
R_b = SR \times m \times r \times \eta_{oh}
\]

- \( R_b \): Useful bit rate (kbps)
- \( SR \): Symbol rate (ksps)
- \( m = 2 \) (QPSK)
- \( r = 3/4 \) (Convolutional code rate)
- \( \eta_{oh} = 188/204 \) (RS overhead)

**Calculating Symbol Rate** (this application mode):

\[
SR = \frac{R_b}{m \times r \times \eta_{oh}}
\]

#### Occupied Bandwidth Formula (Nyquist bandwidth + roll-off)

\[
B = SR \times (1 + \alpha)
\]

#### Spectral Efficiency Formula

\[
\eta_s = \frac{R_b}{B} = \frac{m \times r \times \eta_{oh}}{1 + \alpha}
\]

### 3. Explanation of Principles (DVB-S Physical Layer Operating Principle)

DVB-S is the European ETSI satellite digital television standard, using **concatenated error correction + QPSK**:
1. **MPEG-TS flow** → 188-byte packets.
2. **Outer code (RS code)**: (204,188) adds 16 bytes.
3. **Inner code (Convolutional code)**: Rate 1/2, 2/3, 3/4, 5/6, 7/8.
4. **QPSK modulation**: 2 bits per symbol.
5. **Pulse shaping**: SRRC filter with roll-off α.
6. **RF transmission**: Bandwidth B = SR × (1+α).

---

### DVB-S2 / S2X Differences

DVB-S2/S2X removes the Reed-Solomon (204,188) outer code overhead (η_oh = 1.0) and uses stronger LDPC inner codes, resulting in higher efficiency for the exact same symbol rate and bandwidth.
