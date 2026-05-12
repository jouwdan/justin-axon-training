'use server'
import { handleServerFunctions as _handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './importMap'
import type { ServerFunctionHandler } from 'payload'

type Args = Parameters<ServerFunctionHandler>[0]

export async function handleServerFunctions(args: Args) {
  return _handleServerFunctions({ ...args, config, importMap })
}
