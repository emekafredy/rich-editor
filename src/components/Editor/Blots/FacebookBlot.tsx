import { Quill } from "react-quill";

class FacebookBlot extends Quill.import("blots/embed") {
  static blotName = "facebook";
  static tagName = "div";

  static create(value: any) {
    const node = super.create(value);
    node.innerHTML = this.getFacebookEmbed(value.url);
    return node;
  }

  static value(node: any) {
    return { url: node.getAttribute("data-url") };
  }

  static getFacebookEmbed(url: string) {
    if (url) {
      return `<iframe src="https://www.facebook.com/plugins/post.php?href=${url}" width="100%" height="350" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;
    } else {
      return "";
    }
  }
}

export const embedFacebookLink = (quill: any, url: string) => {
  const editor = (quill.current as any).getEditor();
  const range = editor.getSelection(true);

  const embedData = {
    url,
  };

  editor.insertText(range.index, "\n");
  editor.insertEmbed(range.index + 1, "facebook", embedData, "user");
  editor.insertText(range.index + 2, "\n");
};

export default FacebookBlot;
