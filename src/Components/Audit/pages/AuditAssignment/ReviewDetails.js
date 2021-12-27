import React from 'react'
import Text from "../../components/Text/Text";
import Button from "../../components/Buttons/Button";
import styles from "./style.module.scss";

function ReviewDetails() {
    return (
        <>
        <div className={styles.reviewDetailsHeadingContainer}>
          <Text
            heading="p"
            text="basic audit details"
            variant="stepperSubHeading"
          />
          <Button variant="stroke" description="Edit" size="none" />
        </div>
        <div className={styles.dataRow}>
          <div className={styles.keyBox}>
            <Text
              heading="p"
              text="audit template"
              variant="smallTableHeading"
            />
          </div>
          <div className={styles.valueBox}>
            <Text
              heading="p"
              text="tax audit"
              variant="smallTableHeading"
            />
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.keyBox}>
            <Text
              heading="p"
              text="assignment name"
              variant="smallTableHeading"
            />
          </div>
          <div className={styles.valueBox}>
            <Text
              heading="p"
              text="tax audit"
              variant="smallTableHeading"
            />
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.keyBox}>
            <Text
              heading="p"
              text="company's name"
              variant="smallTableHeading"
            />
          </div>
          <div className={styles.valueBox}>
            <Text
              heading="p"
              text="BK securities"
              variant="smallTableHeading"
            />
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.keyBox}>
            <Text
              heading="p"
              text="Audit scope"
              variant="smallTableHeading"
            />
          </div>
          <div className={styles.valueBox}>
            <Text
              heading="p"
              text="Local branch audit"
              variant="smallTableHeading"
            />
          </div>
        </div>
        <div className={styles.dataRow}>
          <div className={styles.keyBox}>
            <Text
              heading="p"
              text="audit deadline"
              variant="smallTableHeading"
            />
          </div>
          <div className={styles.valueBox}>
            <Text
              heading="p"
              text="Nov 21, 2021"
              variant="smallTableHeading"
            />
          </div>
        </div>
      </>
    )
}

export default ReviewDetails
