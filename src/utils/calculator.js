const calculator = {
  // 常数定义
  RS_CODE: 188 / 204,
  ROLL_OFF: 0.05,
  
  // 调制因子
  MOD_FACT: {
    "BPSK": 1,
    "QPSK": 2,
    "8PSK": 3,
    "16APSK": 4,
    "32APSK": 5,
    "64APSK": 6,
    "128APSK": 7,
    "256APSK": 8
  },
  
  // 下行链路 modcod 列表
  DOWNLINK_MODCODS: [
    "BPSK 1/5", "BPSK 11/45", "BPSK 4/15", "BPSK 1/3", "QPSK 2/9",
    "QPSK 11/45", "QPSK 1/4", "QPSK 4/15", "QPSK 13/45", "QPSK 14/45",
    "QPSK 1/3", "QPSK 2/5", "QPSK 9/20", "QPSK 7/15", "QPSK 1/2", "QPSK 11/20",
    "QPSK 8/15", "QPSK 3/5", "QPSK 2/3", "QPSK 32/45", "QPSK 3/4", "QPSK 4/5",
    "QPSK 5/6", "QPSK 8/9", "QPSK 9/10", "8PSK 7/15", "8PSK 8/15", "8PSK 3/5",
    "8PSK 26/45", "8PSK 23/36", "8PSK 2/3", "8PSK 25/36", "8PSK 13/18",
    "8PSK 32/45", "8PSK 3/4", "8PSK 5/6", "8PSK 8/9", "8PSK 9/10",
    "16APSK 1/2-L", "16APSK 7/15", "16APSK 8/15-L", "16APSK 5/9-L",
    "16APSK 8/15", "16APSK 3/5-L", "16APSK 26/45", "16APSK 3/5",
    "16APSK 28/45", "16APSK 23/36", "16APSK 2/3-L", "16APSK 2/3",
    "16APSK 25/36", "16APSK 13/18", "16APSK 32/45", "16APSK 3/4", "16APSK 7/9",
    "16APSK 4/5", "16APSK 5/6", "16APSK 77/90", "16APSK 8/9", "16APSK 9/10",
    "32APSK 2/3-L", "32APSK 2/3", "32APSK 32/45", "32APSK 11/15", "32APSK 3/4",
    "32APSK 7/9", "32APSK 4/5", "32APSK 5/6", "32APSK 8/9", "32APSK 9/10",
    "64APSK 32/45-L", "64APSK 11/15", "64APSK 7/9", "64APSK 4/5", "64APSK 5/6",
    "128APSK 3/4", "128APSK 7/9", "256APSK 29/45-L", "256APSK 2/3-L",
    "256APSK 31/45-L", "256APSK 32/45", "256APSK 11/15-L", "256APSK 3/4"
  ],
  
  // 上行链路 modcod 列表
  UPLINK_MODCODS: [
    "QPSK-7/20", "QPSK-2/5", "QPSK-9/20", "QPSK-1/2", "QPSK-11/20", "QPSK-3/5",
    "QPSK-13/20", "QPSK-7/10", "QPSK-3/4", "QPSK-4/5", "QPSK-17/20",
    "8PSK-7/15", "8PSK-1/2", "8PSK-8/15", "8PSK-17/30", "8PSK-3/5",
    "8PSK-19/30", "8PSK-2/3", "8PSK-7/10", "8PSK-11/15", "16APSK-2/5",
    "16APSK-17/40", "16APSK-9/20", "16APSK-19/40", "16APSK-1/2",
    "16APSK-21/40", "16APSK-11/20", "16APSK-23/40", "16APSK-3/5", "16APSK-5/8",
    "16APSK-13/20", "16APSK-27/40", "16APSK-7/10", "16APSK-29/40",
    "16APSK-3/4", "16APSK-31/40", "16APSK-4/5", "64APSK-31/60", "64APSK-8/15",
    "64APSK-11/20", "64APSK-17/30", "64APSK-7/12", "64APSK-3/5",
    "64APSK-37/60", "64APSK-19/30", "64APSK-13/20", "64APSK-2/3",
    "64APSK-41/60", "64APSK-7/10", "64APSK-43/60", "64APSK-11/15",
    "64APSK-3/4", "64APSK-23/30", "64APSK-47/60", "64APSK-4/5", "64APSK-49/60",
    "64APSK-5/6", "64APSK-17/20", "64APSK-13/15", "64APSK-53/60"
  ],
  
  // 从MODCOD字符串中提取调制方式
  getModulation: function(modcod) {
    // 下行链路格式 "QPSK 3/4"
    // 上行链路格式 "QPSK-3/4"
    if (modcod.includes(' ')) {
      return modcod.split(' ')[0];
    } else if (modcod.includes('-')) {
      return modcod.split('-')[0];
    }
    return "";
  },
  
  // 从MODCOD字符串中提取FEC码率
  getFecRate: function(modcod) {
    let fecPart = "";
    // 下行链路格式 "QPSK 3/4"
    if (modcod.includes(' ')) {
      fecPart = modcod.split(' ')[1];
    } 
    // 上行链路格式 "QPSK-3/4"
    else if (modcod.includes('-')) {
      fecPart = modcod.split('-')[1];
    }
    
    // 处理带 -L 后缀的情况，如 "16APSK 2/3-L"
    if (fecPart.includes('-L')) {
      fecPart = fecPart.replace('-L', '');
    }
    
    if (fecPart.includes('/')) {
      const [numerator, denominator] = fecPart.split('/').map(Number);
      return numerator / denominator;
    }
    
    return 1; // 默认值
  },
  
  // 计算符号速率 (公式1)
  calculateSymbolRate: function(dataRate, modcod) {
    const modulation = this.getModulation(modcod);
    const modFact = this.MOD_FACT[modulation];
    const viterbiFec = this.getFecRate(modcod);
    
    return dataRate / (modFact * viterbiFec * this.RS_CODE);
  },
  
  // 计算带宽
  calculateBandwidth: function(symbolRate) {
    return symbolRate * (1 + this.ROLL_OFF);
  },
  
  // 计算效率
  calculateEfficiency: function(dataRate, bandwidth) {
    return dataRate / bandwidth;
  },
  
  // 计算数据速率 (公式2)
  calculateDataRate: function(symbolRate, modcod) {
    const modulation = this.getModulation(modcod);
    const modFact = this.MOD_FACT[modulation];
    const viterbiFec = this.getFecRate(modcod);
    
    return symbolRate * (modFact * viterbiFec * this.RS_CODE);
  },
  
  // 获取滚降因子百分比 (用于显示)
  getRollOffPercentage: function() {
    return Math.round(this.ROLL_OFF * 100);
  },
  
  // 瓦特转dBm
  wattsTodBm: function(watts) {
    return 10 * Math.log10(watts) + 30;
  },
  
  // dBm转瓦特
  dBmToWatts: function(dBm) {
    return Math.pow(10, (dBm / 10) - 3);
  }
};

export default calculator;
