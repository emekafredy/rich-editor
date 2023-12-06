import { validateUrl } from "./utils";

export const validateInputUrl = (url, provider, newErrors) => {
  let valid = true;
  const value = url.trim();
  const isValid = validateUrl(url, provider);

  if (value && !isValid) {
    valid = false;
    newErrors[provider] = `: ${provider} url is not valid`;
  }

  return valid;
};
