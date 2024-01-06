import { useQuasar } from 'quasar';

const useNotify = () => {
  const $q = useQuasar();

  function notifySuccess(message: string) {
    $q.notify({
      type: 'positive',
      position: 'top-right',
      message,
    });
  }

  function notifyError(message: string) {
    $q.notify({
      type: 'negative',
      position: 'top-right',
      message,
    });
  }

  return {
    notifySuccess,
    notifyError,
  };
};

export default useNotify;
