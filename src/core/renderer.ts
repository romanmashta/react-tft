import reconciler  from "./reconciler.ts";

const containerInfo = new Set();

const onRecoverableError = (error: Error) => {
  console.log(error);
}

export const Renderer = {
  render: (element: any) => {
    const container = reconciler.createContainer(
      containerInfo,
      0,
      null,
      false,
      false,
      "id_",
      onRecoverableError,
      null,
    );

    const parentComponent = null;
    reconciler.updateContainer(element, container, parentComponent);
  }
}
