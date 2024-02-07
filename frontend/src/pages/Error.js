import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

export default function ErrorPage() {
  const error = useRouteError();

  let title = 'An Error Occurred';
  let message = 'Could not load events';

  switch (error.status) {
    case 500:
      message = JSON.parse(error.data).message;
      break;
    case 404:
      title = 'Not Found!';
      message = 'Could not find data';
      break;
    
  }

  return (
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
  );
}
