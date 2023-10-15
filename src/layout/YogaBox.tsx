import {ScreenProps} from "../Display.tsx";
import Yoga, {Align, Node, FlexDirection, MeasureFunction} from 'yoga-layout/sync';
import {createContext, useContext, useEffect, useState} from "react";

type ScreenContextProps = ScreenProps & {
  isDirty?: boolean,
}

type StyleProps = {
  w?: number | 'auto',
  h?: number | 'auto',
  mt?: number,
  mb?: number,
  ml?: number,
  mr?: number,
  m?: number,
  mx?: number,
  my?: number,
  direction?: FlexDirection,
  grow?: number,
  font?: number[],
  alignItems?: Align,
}

const ScreenContext = createContext<ScreenContextProps>({
  width: 0,
  height: 0,
});

const NodeContext = createContext<Node | undefined>(undefined);

type ViewProps = {
  style?: StyleProps,
  children?: React.ReactNode,
}

const SetStyle = (node: Node, style?: StyleProps) => {
  node.setWidth("auto");
  node.setHeight("auto");
  node.setMargin(Yoga.EDGE_ALL, 0);
  node.setFlexDirection(FlexDirection.Column);

  style?.w && node.setWidth(style.w);
  style?.h && node.setHeight(style.h);
  style?.mt && node.setMargin(Yoga.EDGE_TOP, style.mt);
  style?.mb && node.setMargin(Yoga.EDGE_BOTTOM, style.mb);
  style?.ml && node.setMargin(Yoga.EDGE_LEFT, style.ml);
  style?.mr && node.setMargin(Yoga.EDGE_RIGHT, style.mr);
  style?.m && node.setMargin(Yoga.EDGE_ALL, style.m);
  style?.mx && node.setMargin(Yoga.EDGE_HORIZONTAL, style.mx);
  style?.my && node.setMargin(Yoga.EDGE_VERTICAL, style.my);
  style?.direction && node.setFlexDirection(style.direction);
  style?.alignItems && node.setAlignItems(style.alignItems);
  style?.grow && node.setFlexGrow(style.grow);
}

const createNode = (parent?: Node, style?: StyleProps) => {
  const node = Yoga.Node.create();

  if (parent)
   parent.insertChild(node, parent.getChildCount());

  SetStyle(node, style);
  console.log("node created", node, parent);
  return node;
}

const LayoutContext = createContext({
  isDirty: false,
  setIsDirty: (_: boolean) => {
  }
});

const isText = (children: React.ReactNode): children is string | number => {
  return typeof children === 'string' || typeof children === 'number';
}

export const View = ({style, children}: ViewProps) => {
  const {isDirty, setIsDirty} = useContext(LayoutContext);
  const {sprite} = useContext(ScreenContext);
  const parentNode = useContext(NodeContext);

  const [node, setNode] = useState<Node | undefined>(undefined);
  useEffect(() => {
    if (!parentNode)
      return;
    const n = createNode(parentNode, style);
    setNode(n);
    return () => {
      parentNode.removeChild(n);
      node?.free();
    }
  }, [parentNode]);

  useEffect(() => {
    if(node && isText(children)){
      node.setMeasureFunc(() => {
        style?.font && sprite?.loadFont(style?.font);
        const height = sprite?.fontHeight() ?? 16;
        const width = sprite?.textWidth(children.toString()) ?? 0;
        style?.font && sprite?.unloadFont();
        return {width , height};
      });
    }
  }, [node, sprite]);


  useEffect(() => {
    if (isDirty || !node || node.isDirty())
      return;
    const left = node.getComputedLeft();
    const top = node.getComputedTop();
    const w = node.getComputedWidth();
    const h = node.getComputedHeight();

    if(isText(children)){
      style?.font && sprite?.loadFont(style?.font);
      sprite?.drawString(children.toString(), left, top);
      style?.font && sprite?.unloadFont();
    }
    sprite?.drawRect(left, top, w, h, 0xFFFF);
    console.log("view drawn", {left, top, w, h});
  }, [node, sprite, isDirty]);

  useEffect(() => {
    if (!node)
      return;
    if (!isDirty) {
      SetStyle(node, style);
      console.log('SetStyle', node, style);
      setIsDirty(true);
    }
  }, [node, style]);

  return <NodeContext.Provider value={node}>
    {children}
  </NodeContext.Provider>
}

export const YogaBox = ({display, sprite, width, height, children}: ScreenProps) => {
  const [isDirty, setIsDirty] = useState(true);
  const [rootNode, setRootNode] = useState<Node | undefined>(undefined);
  useEffect(() => {
    const node = createNode();

    setRootNode(node);
    return () => {
      rootNode?.free();
    }
  }, []);

  useEffect(() => {
    if (!rootNode || !display || !sprite)
      return;

    if (isDirty) {
      sprite?.fillSprite(0);
      rootNode.calculateLayout(width, height, Yoga.DIRECTION_LTR);
      console.log("layout calculated", rootNode);
      setIsDirty(false);
    } else {
      const left = rootNode.getComputedLeft();
      const top = rootNode.getComputedTop();
      const w = rootNode.getComputedWidth();
      const h = rootNode.getComputedHeight();

      sprite?.drawRect(left, top, w, h, 0xFFFF);
      console.log("drawn", {left, top, w, h});

      display?.DrawToScreen(sprite);
    }

  }, [rootNode, isDirty, display, sprite]);


  return (
    <ScreenContext.Provider value={{display, sprite, width, height}}>
      <NodeContext.Provider value={rootNode}>
        <LayoutContext.Provider value={{isDirty, setIsDirty}}>
          {children}
        </LayoutContext.Provider>
      </NodeContext.Provider>
    </ScreenContext.Provider>
  )
}
