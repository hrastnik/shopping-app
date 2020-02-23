import React, { useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Spinner
} from "~/components";
import _ from "lodash";
import { HorizontalLine } from "./HorizontalLine";
import { useStore } from "~/mobx/utils/useStore";

function intersperse(array, element) {
  const newArray = [...array];
  for (let i = 1; i < newArray.length; i += 2) {
    newArray.splice(i, 0, element);
  }
  return newArray;
}

const S = StyleSheet.create({
  textInputStyle: {},

  mentionedText: { fontFamily: "OpenSans-Bold", fontWeight: "700" },

  defaultMentionsList: {
    maxHeight: 120
  }
});

export function MentionsTextInput({
  mentionsSource, // api call, list
  onChangeText,
  onMentionsChange,
  text = "",
  renderItem,
  mentions = [],
  listStyle = {},
  textInputStyle = {},
  mentionedTextStyle = {},
  listCocoStyle = {},
  popupPosition = "bottom",
  style = undefined,
  ...props
}) {
  const [searchedMentions, setSearchedMentions] = useState([]);
  const [isSearchInProgress, setIsSearchInProgress] = useState(false);
  const textInput = useRef();
  const store = useStore();
  const { t } = store.i18n;

  function processMentions(text, search) {
    const textArray = [text];
    for (const person of search) {
      for (let i = 0; i < textArray.length; i++) {
        const textChunk = textArray[i];
        if (typeof textChunk !== "string") continue;
        const splitChunk = textChunk.split(person);
        const interspersedChunk = intersperse(
          splitChunk,
          <Text style={[S.mentionedText, mentionedTextStyle]}>{person}</Text>
        );

        textArray.splice(i, 1, ...interspersedChunk);
      }
    }
    return textArray;
  }

  const textSplited = processMentions(
    text,
    mentions.map(m => `@${m.item.label}`)
  );

  const insertMention = mention => {
    const textSplited = processMentions(
      text,
      mentions.map(m => `@${m.item.label}`)
    );
    const chunk = textSplited.find(chunk => {
      return typeof chunk === "string" && chunk.includes("@");
    });
    if (!chunk) return;
    const searchStartIndex = chunk.indexOf("@");
    const searchParam = chunk.substring(searchStartIndex, chunk.length);
    const newText = text.replace(`${searchParam}`, `@${mention.item.label} `);
    const newMentions = [...mentions, mention];
    onMentionsChange(newMentions);
    onChangeText(newText);
    setSearchedMentions([]);
    if (typeof _.get(textInput, "current.focus") === "function")
      _.get(textInput, "current.focus")();
  };

  const searchMentions = useCallback(
    _.memoize(
      _.debounce(async (text: string) => {
        if (isSearchInProgress) return;
        const textSplited = processMentions(
          text,
          mentions.map(m => `@${m.item.label}`)
        );

        const chunk = textSplited.find(chunk => {
          return typeof chunk === "string" && chunk.includes("@");
        });
        if (!chunk) return;
        const searchStartIndex = chunk.indexOf("@");
        const searchParam = chunk.substring(searchStartIndex + 1, chunk.length);
        if (searchParam.length < 3) return;
        setIsSearchInProgress(true);
        try {
          const response = await mentionsSource(searchParam);
          setSearchedMentions(response.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsSearchInProgress(false);
        }
      }, 400)
    ),
    [mentions]
  );

  const renderListItem = props => (
    <TouchableOpacity
      onPress={() => {
        insertMention(props.item);
      }}
    >
      {renderItem(props)}
    </TouchableOpacity>
  );

  const validateMentions = useCallback(
    text => {
      const areValidMentions = mentions.every(m => text.includes(m.item.label));
      if (!areValidMentions)
        onMentionsChange(mentions.filter(m => text.includes(m.item.label)));
    },
    [mentions, onMentionsChange]
  );

  const handleSearch = useCallback(
    async text => {
      onChangeText(text);
      validateMentions(text);
      if (text.length < 3) return;

      searchMentions(text);
    },
    [onChangeText, searchMentions, validateMentions]
  );

  const isMentionsPickerShown = textSplited.find(chunk => {
    return typeof chunk === "string" && chunk.includes("@");
  });

  const keyExtractor = item => item.id || (Math.random() * 10000000).toFixed(0);

  const emptyListComponent = () => {
    return (
      <View centerContent paddingMedium>
        {isSearchInProgress ? <Spinner /> : <Text>{t("No results")}</Text>}
      </View>
    );
  };

  const postitionStyle =
    popupPosition === "top" ? { flexDirection: "column-reverse" } : {};

  return (
    <View style={[postitionStyle, style]}>
      <TextInput
        onChangeText={handleSearch}
        style={[S.textInputStyle, textInputStyle]}
        ref={textInput}
        {...props}
      >
        <Text>{textSplited}</Text>
      </TextInput>
      {isMentionsPickerShown && (
        <FlatList
          data={searchedMentions}
          renderItem={renderListItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={emptyListComponent}
          style={[S.defaultMentionsList, listStyle]}
          contentContainerStyle={[listCocoStyle]}
          ItemSeparatorComponent={HorizontalLine}
          nestedScrollEnabled
        />
      )}
    </View>
  );
}
