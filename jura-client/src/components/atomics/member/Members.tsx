import Image from 'react-bootstrap/Image';

type MemberProps = {
  src: string;
  position: number;
};

export const Member = ({ src, position }: MemberProps) => {
  return (
    <div data-testid="participant" className="position-absolute" style={{ right: 50 - position * 15 }}>
      <Image style={{ width: '1.5em', height: '1.5em' }} src={src} alt="avatar" roundedCircle />
    </div>
  );
};

export type MembersProps = {
  members?: string[];
};

export const Members = ({ members }: MembersProps) => {
  if (!members) return null;
  const maxMembers = members.slice(0, 4);
  const membersToShow = members.length > 4 ? maxMembers : members;

  return (
    <div data-testid="members" className="position-relative">
      {membersToShow.map((p, i) => (
        <Member key={`${p}-${Math.random() * 100}`} src="https://randomuser.me/api/portraits/lego/7.jpg" position={i} />
      ))}
    </div>
  );
};
