import { FC, memo } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

interface IErrorBlock {
  error: String;
}

const ErrorBlock: FC<IErrorBlock> = ({ error }) => {
  if (!error) {
    return null;
  }
  return (
    <div>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </div>
  );
};

export default memo(ErrorBlock);
