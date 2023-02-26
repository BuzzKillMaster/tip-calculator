const NaNSafe = (value: number) => isNaN(value) ? 0 : value

export default NaNSafe