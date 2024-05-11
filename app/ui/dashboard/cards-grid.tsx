import {
  ConvoData,
  DisplayCard,
  SafeUser,
  UserIdGrab,
  MessageData,
} from '@/app/lib/definitions';
import Card from '../user-card/card';
import { Message } from 'postcss';

export default function CardsGrid({
  data,
  allUsers,
  userData,
  convos,
  messages,
}: {
  data: DisplayCard[] | null;
  allUsers: UserIdGrab[];
  userData: SafeUser;
  convos: ConvoData[];
  messages: MessageData[];
}) {
  return (
    <>
      {data?.map((card) => (
        <div
          className="0 mb-3 mt-3 w-full max-w-[500px] xl:min-w-[500px]"
          key={card.username}
        >
          <Card
            convos={convos}
            messages={messages}
            userData={userData}
            allUsers={allUsers}
            userCard={card}
          />
        </div>
      ))}
    </>
  );
}
