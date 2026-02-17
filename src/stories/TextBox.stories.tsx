import type { Meta, StoryObj } from "@storybook/react";
import { TextBox } from "./TextBox";
import { useState } from "react";

const meta: Meta<typeof TextBox> = {
    title: "Example/TextBox",
    component: TextBox,
    argTypes: {
        placeholder: { control: "text" },
        disabled: { control: "boolean"},
        error: { control: "boolean"},
    },
};

export default meta;
type Story = StoryObj<typeof TextBox>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <TextBox
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    placeholder: "入力してください",
    disabled: false,
    error: false,
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Error: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: true,
  },
};