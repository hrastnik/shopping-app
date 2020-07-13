import React from "react";
import { observer } from "mobx-react";

import { Screen } from "~/components/Screen";

import { CreateAccountForm } from "~/features/create-account-form/create-account-form.component";

export const CreateAccountScreen = observer(() => {
  return (
    <Screen>
      <CreateAccountForm
        onSuccess={() => {
          console.warn("Successfully created account and logged in.");
        }}
      />
    </Screen>
  );
});
