import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { _locales } from "./_locales";
import { ScratchAuth_Login } from "scratch-auth-react";

export function AlertDialogCustomButton_loginUserOnly({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ? title : _locales("You cannot access this feature!")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description
                ? description
                : _locales(
                    `This feature is only available with a Scratch account. If you don't have one, please create an account and log in to access this feature.`
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{_locales("Close")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => ScratchAuth_Login()}>
              {_locales("Login")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function AlertDialogCustomButton_NotRelease({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title
                ? title
                : _locales("This feature is currently unavailable!")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description
                ? description
                : _locales(
                    "This feature is currently under development or temporarily disabled and cannot be used."
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{_locales("Close")}</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
