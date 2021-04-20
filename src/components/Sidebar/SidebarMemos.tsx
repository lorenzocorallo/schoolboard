import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import chroma from 'chroma-js';
import styled from 'styled-components';
import { ipcRenderer as ipc } from 'electron';
import Store from '../../models/store';
import { recognizeUrls } from '../../util/string';
import Paper, {
  PaperContent,
  PaperHeader,
  PaperHeaderLine,
} from '../Styled/Paper';
import { Memo } from '../../models/Student';
import { checkIfSameDate } from '../../util/dates';
import CopySvg from '../../assets/img/CopySvg';
import { ThemeType } from '../Styled/Theme';

const Main = styled.div`
  margin: 1rem 0;
`;

const Links = styled.div`
  padding-top: 2rem;
  width: 100%;
`;

const LinksItem = styled(Paper)`
  background: ${(props) => props.theme.paper2};
  padding: 0.8rem;
  list-style: none;
  margin: 0.5rem 0;
  border-radius: 8px;
  display: flex;
  font-size: 1.4rem;
`;

const LinksItemFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 1.4rem;
`;

const CopyBtn = styled.button<{ theme: ThemeType }>`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s ease;
  background: ${(props) => chroma(props.theme.paper2).brighten(0.5).hex()};
  align-items: center;
  :hover {
    background: ${(props) => chroma(props.theme.paper2).brighten(0.8).hex()};
  }
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const Item = ({ memo }: { memo: Memo }) => {
  const [copied, setCopied] = useState(false);
  const { urls, deprived } = recognizeUrls(memo.description);
  const handleCopy = async (url: string) => {
    ipc.send('copy', url);
  };
  ipc.on('copy-response', (_event, res) => {
    if (res) setCopied(true);
  });
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 800);
    }
  }, [copied]);
  return (
    <Paper style={{ margin: '1rem 0' }}>
      <PaperHeader>
        <PaperHeaderLine />
        <p>{memo.author}</p>
      </PaperHeader>
      <PaperContent style={{ flexDirection: 'column' }}>
        <p>{deprived}</p>
        {urls.length > 0 && (
          <Links>
            <p>Links</p>
            {urls.map((url) => (
              <LinksItem key={url}>
                <a target="_blank" rel="noreferrer" href={url}>
                  {url}
                </a>
                <LinksItemFooter>
                  <CopyBtn
                    style={{ background: copied ? '#358125' : undefined }}
                    type="button"
                    onClick={() => handleCopy(url)}
                  >
                    <CopySvg />
                  </CopyBtn>
                </LinksItemFooter>
              </LinksItem>
            ))}
          </Links>
        )}
      </PaperContent>
    </Paper>
  );
};

const SidebarMemos = () => {
  const selectedDate = useSelector((store: Store) => store.system.selectedDate);
  const storeMemos = useSelector((store: Store) => store.student.memos);
  const [memos, setMemos] = useState<Memo[]>([]);
  useEffect(() => {
    const filtered = storeMemos.filter((memo) =>
      checkIfSameDate(memo.date, selectedDate)
    );
    setMemos(filtered);
  }, [storeMemos, selectedDate]);
  return (
    <Main>
      {memos.map((memo) => (
        <Item key={memo.id} memo={memo} />
      ))}
    </Main>
  );
};

export default SidebarMemos;
