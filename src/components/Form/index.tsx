import { Input } from "./Input";

export interface FormProps {
  children: React.ReactNode;
}

const Form = (props: FormProps) => {
  return <form className="flex flex-col gap-3">{props.children}</form>;
};

export { Form, Input };
