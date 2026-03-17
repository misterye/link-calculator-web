### 1. EIRP (Effective Isotropic Radiated Power)

#### Terminology Explanation
- **EIRP**: Effective Isotropic Radiated Power. The actual power emitted, multiplied by the antenna gain and subtracting feeder losses, equivalent to what an isotropic antenna would radiate. It is a critical transmitter metric.
- **Ptx (TX Power)**: Transmitter output power (dBW).
- **Gtx (TX Antenna Gain)**: Transmitter antenna gain (dBi).
- **Ltx (Feeder Loss)**: Loss from the transmitter output to the antenna input port (dB).

#### Formulas
In **logarithmic (dB) units**:
\[
\text{EIRP (dBW)} = P_{tx}\text{(dBW)} + G_{tx}\text{(dBi)} - L_{tx}\text{(dB)}
\]

### 2. G/T (Figure of Merit)

#### Terminology Explanation
- **G/T (Receive System Figure of Merit)**: Ratio of receiving antenna gain (G) to system noise temperature (T). Unit is dB/K. Essential receiver metric measuring "ability to receive weak signals".
- **Grx (RX Antenna Gain)**: Receive antenna gain (dBi).
- **Tsys (System Noise Temperature)**: Equivalent noise temperature (K), aggregating all noise sources (antenna, LNA, feeders). Lower is better.

#### Formulas
\[
\frac{G}{T} = \frac{G_{rx}}{T_{sys}}
\]
Converted to dB:
\[
\frac{G}{T}\ (\text{dB/K}) = G_{rx}\ (\text{dBi}) - 10 \log_{10}(T_{sys})
\]

### 3. Summary & Practical Meaning
- **Practical Scenarios**: EIRP determines "how far we can transmit", and G/T determines "how weak of a signal we can receive". Combined, they complete the end-to-end Link Margin calculation.
