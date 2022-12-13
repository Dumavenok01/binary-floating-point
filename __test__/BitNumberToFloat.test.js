const { bitNumberToFloat32, bitNumberToFloat64 } = require("../BitNumberToFloat");
const { testCases32Bits, testCases64Bits } =  require("./TestCase");


describe("bitNumberToFloat32", () => {
  it("should convert floating bits to floating decimal number", () => {
    for (let testCaseIndex = 0; testCaseIndex < testCases32Bits.length; testCaseIndex++) {
      const [decimal, binaryNumber] = testCases32Bits[testCaseIndex];
      const bits = binaryNumber.split('').map((bitString) => parseInt(bitString, 10));  
      expect(bitNumberToFloat32(bits)).toBe(decimal);
    }
  });
});

describe("bitNumberToFloat64", () => {
  it("should convert floating bits to floating decimal number", () => {
    for (let testCaseIndex = 0; testCaseIndex < testCases64Bits.length; testCaseIndex++) {
      const [decimal, binaryNumber] = testCases64Bits[testCaseIndex];
      const bits = binaryNumber.split('').map((bitString) => parseInt(bitString, 10));
      expect(bitNumberToFloat64(bits)).toBe(decimal);
    }
  });
});

