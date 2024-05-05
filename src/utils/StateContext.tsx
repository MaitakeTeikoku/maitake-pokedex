import { createContext, useContext, useState } from "react";

type Severity = "error" | "warning" | "info" | "success";
type State = {
  messageOpen: boolean;
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messageText: string;
  messageSeverity: Severity;
  createMessage: (text: string, severity: Severity) => void;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
type StateProviderProps = {
  children: React.ReactNode;
}

const StateContext = createContext<State>({
  messageOpen: false,
  setMessageOpen: () => { },
  messageText: "",
  messageSeverity: "info",
  createMessage: () => { },
  isRunning: false,
  setIsRunning: () => { }
});

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  // メッセージのテキスト
  const [messageText, setMessageText] = useState<string>("");
  // メッセージを表示するか
  const [messageOpen, setMessageOpen] = useState<boolean>(false);
  // メッセージの重大度
  const [messageSeverity, setMessageSeverity] = useState<Severity>("info");
  // 処理中か
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const createMessage = (text: string, severity: Severity) => {
    setMessageText(text);
    setMessageOpen(true);
    setMessageSeverity(severity);
  }

  const state = {
    messageOpen,
    setMessageOpen,
    messageText,
    messageSeverity,
    createMessage,
    isRunning,
    setIsRunning
  };

  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
