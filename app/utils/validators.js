export function validateInput(input,setInputError) {
    if (!input) {
        setInputError(true);
        return false;
      }
      setInputError(false);
      return true;
}