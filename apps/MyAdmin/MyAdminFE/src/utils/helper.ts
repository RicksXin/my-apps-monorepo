import { routes } from '@/const/route';
import { RouteLocationNormalizedLoaded, RouteMeta, RouteRecordRaw } from 'vue-router';

export interface RouteFormTag {
  name: RouteLocationNormalizedLoaded['name'];
  fullPath: string;
  title: string | RouteMeta['title'];
  cache: RouteMeta['cache'];
  closable: boolean;
}
export const routeByName = (name: string) => {
  let router: RouteLocationNormalizedLoaded;

  const each = (routers: RouteRecordRaw[], name: string) => {
    for (let item of routers) {
      if (item.name === name) {
        router = item as unknown as RouteLocationNormalizedLoaded;
      }

      if (router) break;

      if (item.hasOwnProperty('children') && item.children && item.children.length > 0) {
        each(item.children, name);
      }
    }
    return router;
  };

  return each(routes, name);
};
// const route = useRoute()
export const routeFormatTag = (route: RouteLocationNormalizedLoaded): RouteFormTag => {
  return {
    name: route?.name,
    fullPath: route?.fullPath,
    title: route?.meta?.title || '',
    cache: route?.meta?.cache,
    closable: !route?.meta?.notClosable,
  };
};

export const deepCopy = (obj: any) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if ('isActiveClone' in obj) {
    throw new Error('循环引用警告⚠️');
  }

  let temp: any;
  if (obj instanceof Date) {
    temp = new obj.constructor();
  } else {
    temp = obj.constructor();
  }

  Object.keys(obj).forEach((key) => {
    obj.isActiveClone = null;
    temp[key] = deepCopy(obj[key]);
    delete obj.isActiveClone;
  });
  return temp;
};

// export const getCascaderDefaultIds = (node) => {
//   let ids = []
//   let tempNode = node
//   while (tempNode.data.parent_id) {
//     ids.push(tempNode.data.parent_id)
//     tempNode = tempNode.parent
//   }

//   return ids.reverse()
// }

// export const getNodeParentPath = (id, nodes, path = {}) => {
//   for (let i = 0; i < nodes.length; i++) {
//     if (path.status) {
//       break
//     }

//     let node = nodes[i]
//     if (node.parent_id === 0) {
//       path.ids = []
//     }

//     if (i === 0 && node.parent_id > 0) {
//       path[node.parent_id] = [...path.ids]
//     }

//     if (id === node.id) {
//       path.status = true
//       path.ids = path.hasOwnProperty(node.parent_id) ? [...path[node.parent_id]] : []
//       break
//     } else {
//       path.ids.push(node.id)
//     }

//     if (node.children) {
//       getNodeParentPath(id, node.children, path)
//     }
//   }
// }
