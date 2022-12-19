import { Form, ActionPanel, Action, showHUD, popToRoot } from "@raycast/api";
import { getInfoFromBrowser } from "./util/url";
import { raindropRequest } from "./util/raindrop";
import { useCollections } from "./util/useCollections";
import { useTags } from "./util/useTags";
import { useOpenGraph } from "./util/scraper";

type Values = {
  url: string;
  title: string;
  description: string;
  collection: string;
  tags: string[];
  newTags: string;
};

export default function Command() {
  const collections = useCollections();
  const tags = useTags();
  const url = getInfoFromBrowser();
  const og = useOpenGraph(url.url);

  function handleSubmit(values: Values) {
    const newTags = values.newTags.split(",").map((tag) => tag.trim());

    raindropRequest("/raindrop", "POST", {
      link: values.url,
      title: values.title,
      tags: [...values.tags, newTags],
      description: values.description,
      collection:
        values.collection === "__UNSORTED__"
          ? undefined
          : { $id: Number(values.collection) },
      pleaseParse: {},
    }).then(() => {
      showHUD("Bookmark created");
      popToRoot();
    });
  }

  return (
    <Form
      isLoading={!og}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            onSubmit={(values: Values) => {
              handleSubmit(values);
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="url"
        title="URL"
        defaultValue={url.url}
        error={url.error}
      />
      <Form.Dropdown
        id="collection"
        title="Collection"
        defaultValue="__UNSORTED__"
        autoFocus
      >
        <Form.Dropdown.Item value="__UNSORTED__" title="Unsorted" />
        {collections.map((collection) => (
          <Form.Dropdown.Item
            key={collection.id}
            value={String(collection.id)}
            title={collection.title}
          />
        ))}
      </Form.Dropdown>
      <Form.TagPicker id="tags" title="Tags" placeholder="Optional">
        {tags.map((tag) => (
          <Form.TagPicker.Item
            key={tag.id}
            value={String(tag.id)}
            title={tag.name}
          />
        ))}
      </Form.TagPicker>
      {/* TagPicker doesn't support creating new entries so we need a separate input */}
      <Form.TextField
        id="newTags"
        title="New tags"
        info="Separate multiple values with commas"
      />
      <Form.TextField id="title" title="Title" defaultValue={url.title} />
      {!!og && (
        <>
          <Form.TextArea
            id="description"
            title="Description"
            defaultValue={og.description}
          />
        </>
      )}
    </Form>
  );
}
