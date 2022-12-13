/**
 * @type {PrecisionConfigs}
 */


const precisionConfig = {
    float: {
        signBitsCount: 1,
        exponentBitsCount: 8, 
        mantissaBitsCount: 23
    },

    double: {
        signBitsCount: 1,
        exponentBitsCount: 11, 
        mantissaBitsCount: 52
    }
}

/**
 * 
 * @param {bitNumber} bits 
 * @param {precisionConfig} precisionConfig 
 * @returns {number}
 */

function bitNumberToFloat(bitNumber, precisionConfig){
    const {signBitsCount, exponentBitsCount} = precisionConfig;
    const sign = (-1) ** bitNumber[0];
    const exponent = calculateExponent(bitNumber, exponentBitsCount, signBitsCount);
    const mantissa = calculateMantiss(bitNumber, exponentBitsCount, signBitsCount);
    const smallestValueExponent = -127;

    if(exponent == smallestValueExponent && mantissa == 0){
        return 0;
    }
    
    return sign * (2 ** exponent) * (1 + mantissa);
}

function calculateExponent(bitNumber, exponentBitsCount, signBitsCount){
    const exponentOffset = 2 ** (exponentBitsCount - 1) - 1;
    const exponentBitNumber = bitNumber.slice(signBitsCount, signBitsCount + exponentBitsCount);
    const exponentUnoffset = exponentBitNumber.reduce(
        (exponentSoFar, currentBit, indexBit) => {
            const bitPowerOfTwo = 2 ** (exponentBitsCount - indexBit - 1);
            return exponentSoFar + currentBit * bitPowerOfTwo;
        },
        0
    );
    return exponentUnoffset - exponentOffset;
}

function calculateMantiss(bitNumber, exponentBitsCount, signBitsCount){
    const mantissaBitNumber = bitNumber.slice(exponentBitsCount + signBitsCount);
    return mantissaBitNumber.reduce(
        (mantissaSoFar, currentBit, indexBit) => {
            const bitPowerOfTwo = 2 ** -(indexBit + 1);
            return mantissaSoFar + currentBit * bitPowerOfTwo;
        },
        0
    );
}

function bitNumberToFloat32(bitNumber){
    return bitNumberToFloat(bitNumber, precisionConfig.float);
}

function bitNumberToFloat64(bitNumber){
    return bitNumberToFloat(bitNumber, precisionConfig.double);
}

module.exports = {bitNumberToFloat32, bitNumberToFloat64};