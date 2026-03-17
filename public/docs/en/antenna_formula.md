### 1. Core Terminology Explanation
- **Dish Diameter D**: Physical aperture diameter of the parabolic reflector (unit: m).
- **Frequency f**: Electromagnetic wave frequency (unit: GHz). E.g., 12 GHz for Ku-band.
- **Aperture Efficiency η**: Ratio of effective area to physical area (0~1). Typical parabolic dish is 0.55~0.70.
- **Antenna Gain (dBi)**: How much stronger the antenna is in the maximum radiation direction compared to an **isotropic radiator** (0 dBi).
- **3dB Beamwidth (HPBW)**: Angular width where the main lobe power drops to half (-3 dB) of the maximum (unit: °). Smaller means a narrower, more focused beam.

### 2. Key Formulas and Derivation

#### (1) Wavelength λ Calculation
\[
\lambda = \frac{c}{f}, \quad c = 3 \times 10^8 \, \text{m/s}
\]

#### (2) Antenna Gain Formula (Parabolic)
\[
G_{\text{linear}} = \eta \left( \frac{\pi D}{\lambda} \right)^2
\]
Converted to dBi:
\[
G_{\text{dBi}} = 10 \log_{10} \left[ \eta \left( \frac{\pi D}{\lambda} \right)^2 \right]
\]

#### (3) 3dB Beamwidth Approximation Formula
\[
\theta_{3\text{dB}} \approx 70^\circ \times \frac{\lambda}{D}
\]
(70° is the most widely accepted standard for typical illumination tapers of parabolic antennas).

### 3. Explanation of Physical Principles
Parabolic antennas are essentially **electromagnetic wave focusers**:
- Incident plane waves reflect off the dish and converge at the focal point.
- **Gain** comes from the effective aperture area \( A_e = \eta \times \text{physical area} \).
- **Directivity** is tied to diffraction limits: larger aperture relative to wavelength = narrower beam width.
