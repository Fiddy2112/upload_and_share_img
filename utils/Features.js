export const showAddress = (address) => {
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 0,
    address.length - 4
  )}`;
};

export const truncate = (input) =>
  input.length > 20
    ? `${input.substring(0, 20)}...${input.substring(
        input.length - 0,
        input.length - 4
      )}`
    : input;
