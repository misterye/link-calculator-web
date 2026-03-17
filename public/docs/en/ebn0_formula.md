### 1. Terminology Explanation (Professional Meaning & Units)
- **Eb/N0 (Bit Energy to Noise Power Spectral Density Ratio)**
  Eb: Energy per bit (Joules/bit)
  N0: Noise power spectral density (Watts/Hz)
  Eb/N0 is the core indicator for signal quality in communication systems, especially determining the Bit Error Rate (BER) in digital modulation (e.g., QPSK, 16QAM). Displayed in **dB**.

- **C/N (Carrier-to-Noise Ratio)**
  C: Carrier power (Watts)
  N: Total noise power within the receiver's noise bandwidth
  C/N reflects the ratio of signal strength to noise at the receiver. Displayed in **dB**.

- **Rb (Bit Rate)**
  Unit: kbps (kilo-bits per second). Transmission rate.

- **Bn (Noise Bandwidth)**
  Unit: kHz (kilo-Hertz). Effective bandwidth occupied by noise in the receiver filter.

### 2. Core Formulas and Strict Derivation
**Linear Form**:
\[
\frac{C}{N} = \left( \frac{E_b}{N_0} \right) \times \left( \frac{R_b}{B_n} \right)
\]

**dB Form** (Most Common):
\[
\left( \frac{C}{N} \right)_{\rm dB} = \left( \frac{E_b}{N_0} \right)_{\rm dB} + 10 \log_{10} \left( \frac{R_b}{B_n} \right)
\]

Reverse Conversion:
\[
\left( \frac{E_b}{N_0} \right)_{\rm dB} = \left( \frac{C}{N} \right)_{\rm dB} - 10 \log_{10} \left( \frac{R_b}{B_n} \right)
\]

### 3. Explanation of Principles (Why this converter?)
- In baseband digital communications, BER curves are typically drawn against **Eb/N0**.
- But in actual Link Budgets, RF front-ends measure **C/N**.
- The conversion factor is **Rb/Bn** (i.e., "bandwidth occupied per bit").
