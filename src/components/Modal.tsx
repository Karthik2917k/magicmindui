import { Fragment } from "react";
import { IoIosClose } from "react-icons/io";

type ModalProps = {
  closeModal: () => void;
  closable: boolean;
  children: any;
};

export default function Modal(props: ModalProps) {
  const { closeModal, closable = true, children } = props;
  return (
    <Fragment>
      <div className="fixed left-0 top-0 z-20 flex h-screen w-full select-none items-center justify-center bg-slate-800 bg-opacity-50 backdrop-blur-sm">
        <div className="h-max  max-h-[calc(100%-50px)] w-[90%] overflow-y-scroll whitespace-pre-wrap rounded-lg border bg-white p-4 md:mt-5 lg:w-max">
          <div>
            {closable && (
              <p
                className="ml-auto w-max cursor-pointer border"
                onClick={closeModal}
              >
                <IoIosClose className="h-8 w-8" />
              </p>
            )}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
