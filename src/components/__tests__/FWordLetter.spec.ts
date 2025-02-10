import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FWordLetter from "@/components/FWordLetter.vue";

describe("FWordLetter", () => {
  it("renders properly", () => {
    const wrapper = mount(FWordLetter, { props: { letter: "X" } });
    expect(wrapper.text()).toContain("X");
  });
});
