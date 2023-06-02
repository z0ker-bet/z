export type ReceivedProps = Record<string, any>;

const useNotfound = (props: ReceivedProps) => {
  return {
    ...props,
  };
};

export type Props = ReturnType<typeof useNotfound>;

export default useNotfound;
