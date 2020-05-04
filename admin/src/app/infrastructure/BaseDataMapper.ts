const set = require('lodash/set');
const get = require('lodash/get');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isObject = require('lodash/isObject');

export interface IBaseDataMapper {
  decode: (a) => any
  encode: (a) => any
  asAttrMap?: (decodeKey: string) => AttributeMapStrategy
}

interface AttributeMapStrategy {
  map: string,
  encode?: (a, b) => any,
  decode?: (a, b) => any
}

export class BaseDataMapper {

  // Default Data Mapper creators
  // ---------------

  /**
   * @public
   */
  static number = BaseDataMapper.decorateWithAsAttrMap({
    encode: (value) => value != null ? Number(value) : value,
    decode: (value) => value != null ? Number(value) : value,
  });

  /**
   * @public
   */
  static string = BaseDataMapper.decorateWithAsAttrMap({
    encode: (value) => value != null ? String(value) : value,
    decode: (value) => value != null ? String(value) : value,
  });

  /**
   * @public
   */
  static bool = BaseDataMapper.decorateWithAsAttrMap({
    encode: (value) => {
      if (value != null) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return Boolean(value);
      }

      return value;
    },
    decode: (value) => {
      if (value != null) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return Boolean(value);
      }

      return value;
    }
  });

  /**
   * @public
   */
  static dateTime = BaseDataMapper.decorateWithAsAttrMap({
    encode: (value: string): Date | any => {
      if (value != null) return new Date(value);
      return value;
    },
    decode: (value: Date | any) => {
      if (value instanceof Date) return value.toString();
      return value;
    }
  });

  /**
   * @public
   */
  static get mappingStrategy() {
    return {};
  }

  /**
   * @public
   */
  static encode(source: object) {
    return BaseDataMapper.map(source, this.mappingStrategy);
  }

  /**
   * @public
   */
  static decode(source: object) {
    return BaseDataMapper.reverseMap(source, this.mappingStrategy);
  }

  static resolveDecodedValuePath(attributeMapStrategy: object | string) {
    if (isString(attributeMapStrategy)) {
      return attributeMapStrategy;
    }
    if (isObject(attributeMapStrategy) && isString((attributeMapStrategy as any).map)) {
      return (attributeMapStrategy as any).map;
    }
    return null;
  }

  static encodeAttribute(decodedObject: object,
                         attributeMapStrategy: AttributeMapStrategy,
                         decodedAttributePath: string) {

    const decodedValue = get(decodedObject, decodedAttributePath);
    if (isFunction(attributeMapStrategy.encode)) {
      return attributeMapStrategy.encode(decodedValue, decodedObject)
    }

    return decodedValue;
  }

  static decodeAttribute(encodedObject: object,
                         attributeMapStrategy: AttributeMapStrategy,
                         encodedAttributePath: string) {

    const encodedValue = encodedObject[encodedAttributePath];
    if (isFunction(attributeMapStrategy.decode)) {
      return attributeMapStrategy.decode(encodedValue, encodedObject);
    }

    return encodedValue;
  }

  static reverseMap(encodedObject: object, strategy: object) {
    const strategyKeys = Object.keys(strategy);
    let strategyKeysCount = strategyKeys.length;
    const result = {};

    while (strategyKeysCount--) {
      const encodedAttributePath = strategyKeys[strategyKeysCount];
      const attributeMapStrategy = strategy[encodedAttributePath];
      const decodedAttributePath = this.resolveDecodedValuePath(attributeMapStrategy);

      if (decodedAttributePath) {
        const decodedValue = this.decodeAttribute(
          encodedObject,
          attributeMapStrategy,
          encodedAttributePath
        );

        if (decodedValue != null) {
          set(result, decodedAttributePath, decodedValue);
        }
      }
    }

    return result;
  }

  static map(decodedObject: object, strategy: object) {
    const strategyKeys = Object.keys(strategy);
    let strategyKeysCount = strategyKeys.length;
    const result = {};

    while (strategyKeysCount--) {
      const resultAttributePath = strategyKeys[strategyKeysCount];
      const attributeMapStrategy = strategy[resultAttributePath];
      const decodedAttributePath = this.resolveDecodedValuePath(attributeMapStrategy);

      if (resultAttributePath) {
        const encodedValue = this.encodeAttribute(
          decodedObject,
          attributeMapStrategy,
          decodedAttributePath
        );

        if (encodedValue != null) {
          set(result, resultAttributePath, encodedValue);
        }
      }
    }

    return result;
  }

  static decorateWithAsAttrMap(dataMapper: IBaseDataMapper): IBaseDataMapper {
    dataMapper.asAttrMap = function (decodeKey: string) {
      return {
        map: decodeKey,
        encode: (value) => value && dataMapper.encode(value),
        decode: (value) => value && dataMapper.decode(value)
      };
    };

    return dataMapper;
  }

  /**
   * @public
   */
  static arrayOf(mappingStrategy?: object): IBaseDataMapper {
    return BaseDataMapper.decorateWithAsAttrMap({
      encode: (values) => {
        if (values &&
          values.length &&
          mappingStrategy) {
          return values.map((value) => BaseDataMapper.map(value, mappingStrategy));
        }
        return values;
      },
      decode: (values) => {
        if (values &&
          values.length &&
          mappingStrategy) {
          return values.map((value) => BaseDataMapper.reverseMap(value, mappingStrategy));
        }
        return values;
      }
    });
  }

  /**
   * @public
   */
  static shapeOf(mappingStrategy?: object): IBaseDataMapper {
    return BaseDataMapper.decorateWithAsAttrMap({
      encode: (value) => value && mappingStrategy
        ? BaseDataMapper.map(value, mappingStrategy)
        : value,
      decode: (value) => value && mappingStrategy
        ? BaseDataMapper.reverseMap(value, mappingStrategy)
        : value
    });
  }
}
