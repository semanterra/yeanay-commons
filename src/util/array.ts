// Array utilities

export type SortComparer<T> = (a:T, b:T) => number // sort comparer

export function last<T>(a:T[]): T | null {
    return a[a.length-1]
}

export function compareStrings(a, b) {
    return a > b ? 1 : a === b ? 0 : -1
}
export const compareDates = compareStrings
export function compareNumbers(a,b) {
    return a-b
}

export function invertComparer(c) {
    return (a, b) => -c(a, b)
}
export function makeSortComparer<REC,FLD>(
    extractor:(rec:REC)=>FLD,
    comparer:SortComparer<FLD>
) {
    return (a, b) => comparer(extractor(a), extractor(b))
}

// for multicolumn compares.  Just supports two for now.
export const multiCompare = (c1, c2) => (a,b) => {
    const ret1 = c1(a,b)
    return ret1? ret1 : c2(a,b)
}

/**
 * Break an array into sequential subarrays based on === of some extracted feature
 * @param extractor
 * @param arr
 */
export function partitionBy(extractor, arr) {
    let ret: any[] = []
    let i = 0
    let prev = undefined
    while (i < arr.length) {
        const el = arr[i]
        const next = extractor(el)
        if (next == prev) {
            last(ret).push(el)
        } else {
            ret.push([el])
            prev = next
        }
        i += 1;
    }
    return ret
}

/**
 * I am so tired of being f'd up by "map" hosing "this".
 * @param array
 * @param iteratee
 * @returns {any[]}
 */
export function arrayMap<T, S>(array: T[], iteratee: (input: T, index: number) => S): S[] {
    const length = array == null ? 0 : array.length
    const result = Array(length)

    let index = -1
    while (++index < length) {
        result[index] = iteratee(array[index], index)
    }
    return result
}
