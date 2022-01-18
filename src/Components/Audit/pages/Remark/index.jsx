import React, { useState } from "react";
import styles from "./style.module.scss";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import { useHistory } from "react-router";
import Container from "../../components/Containers";
import IconButton from "../../components/Buttons/IconButton";
import Text from "../../components/Text/Text";

function Remark() {
  const history = useHistory();
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <Container variant="container">
      <Container variant="content">
        <div className={styles.header}>
          <div className="d-flex mb-3">
            <IconButton
              onClick={() => {
                history.goBack();
              }}
              variant="iconButtonRound"
              description={<MdKeyboardArrowLeft />}
              size="none"
            />
            <Text
              heading="p"
              variant="stepperMainHeading"
              text="Remark"
              className="mb-0 ml-3"
            />
          </div>
        </div>
        <div className={styles.accordion}>
          {data.map((item, i) => (
            <div className={styles.item}>
              <div className={styles.title} onClick={() => toggle(i)}>
                <h1>{item.Title}</h1>
                <span className={styles.uparrow}>
                  {selected === i ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </span>
              </div>
              <div className={selected === i ? styles.show : styles.content}>
                <div className={styles.subTitle_first}>
                  <h2>{item.subTitle_first}</h2>
                </div>
                <div className={styles.content_first}>
                  <h3>{item.content_first}</h3>
                </div>
                <div className={styles.subTitle_second}>
                  <h2>{item.subTitle_second}</h2>
                </div>
                <div className={styles.content_second}>
                  <h3>{item.content_second}</h3>
                </div>
                <div className={styles.subTitle_third}>
                  <h2>{item.subTitle_third}</h2>
                </div>
                <div className={styles.content_third}>
                  <h3>{item.content_third}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
}

const data = [
  {
    Title: "Penalty",
    subTitle_first: "When assignment is compiled:",
    content_first:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subTitle_second: "When assignment is not compiled:",
    content_second:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subTitle_third: "when assignment is not applicable:",
    content_third:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    Title: "How to verify this checkpoint?",
    subTitle_first: "step 1",
    content_first:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subTitle_second: "step 2",
    content_second:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    subTitle_third: "step 3",
    content_third:
      " Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export default Remark;
